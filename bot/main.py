import imaplib
import email
import getpass

imap_server = "culink.colorado.edu"
email_address = "joyo1849@colorado.edu"
password = getpass.getpass("Enter Your Password:")

try:
    imap = imaplib.IMAP4_SSL(imap_server)
    imap.login(email_address, password)

    imap.select("Inbox")

    _, msgnums = imap.search(None, "ALL")
    print(msgnums)

    imap.logout()

except Exception as e:
    print("Error:", e)
