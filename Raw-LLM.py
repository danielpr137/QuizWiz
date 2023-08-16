import os.path
import PyPDF2


# assuming the PDF file is located in a dedicated-temporary folder. the .txt file will be saved in the same folder.
def convertPDFtoTXT(pathy):
    path = '/Users/idoofir1/PycharmProjects/QuizWiz/sample.pdf'
    with open(path, 'rb') as PDFFile:
        pdfReader = PyPDF2.PdfFileReader(PDFFile)
        numOfPages = pdfReader.numPages
        pdfObj = pdfReader.getPage(numOfPages + 1)
        text = pdfObj.extractText()
        print("test")
        textFilePath = os.path.join(os.path.dirname(path), 'text.txt')
        with open(textFilePath, 'w') as textFile:
            textFile.writelines(text)
