import os.path
import PyPDF2


# assuming the PDF file is located in a dedicated-temporary folder. the .txt file will be saved in the same folder.
def convertPDFtoTXT(path):
    with open(path, 'rb') as PDFFile:
        pdfReader = PyPDF2.PdfReader(PDFFile)
        numOfPages = len(pdfReader.pages)
        textFilePath = os.path.join(os.path.dirname(path), 'text.txt')
        with open(textFilePath, 'w') as textFile:
            for i in range(numOfPages):
                pdfObj = pdfReader.pages[i]
                text = pdfObj.extract_text()
                textFile.writelines(text)
                textFile.write('\n')
