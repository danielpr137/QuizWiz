import os.path

import PyPDF2
import openai
from langchain import OpenAI
from langchain.document_loaders import WebBaseLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter, CharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI
from langchain.indexes import VectorstoreIndexCreator
from langchain.document_loaders import TextLoader
from transformers import pipeline
from langchain.embeddings.sentence_transformer import SentenceTransformerEmbeddings




# assuming the PDF file is located in a dedicated-temporary folder. the .txt file will be saved in the same folder.
def convertPDFtoTXT(path):
    # open PDF file using Py2PDF package
    with open(path, 'rb') as PDFFile:
        pdfReader = PyPDF2.PdfReader(PDFFile)
        numOfPages = len(pdfReader.pages)
        textFilePath = os.path.join(os.path.dirname(path), 'text.txt')
        # write all PDF pages to a new .txt file named text.txt
        with open(textFilePath, 'w') as textFile:
            for i in range(numOfPages):
                pdfObj = pdfReader.pages[i]
                text = pdfObj.extract_text()
                textFile.writelines(text)
                textFile.write('\n')


def retrieve_questions(path):
    # Load your text document from the specified path
    with open(path, 'r') as file:
        document_text = file.read()
    openai.api_key = "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"
    doc_text = TextLoader(path)
    doc = doc_text.load()
    text_splitter = CharacterTextSplitter(chunk_size=300, chunk_overlap=0)
    texts = text_splitter.split_documents(doc)
    embedding_function = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
    db = Chroma.from_documents(texts, embedding_function)
    llm = ChatOpenAI(openai_api_key=openai.api_key, model_name="gpt-3.5-turbo", temperature=0)
    qa_chain = RetrievalQA.from_chain_type(llm, retriever=db.as_retriever())
    qa_chain({"query": "What was Einstein most important work?"})

    # print results
    print(qa_chain[0].page_content)


retrieve_questions('/Users/idoofir1/PycharmProjects/QuizWiz/text.txt')

