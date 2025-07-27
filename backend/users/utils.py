from random import randint
import os

#otp_generator, email_sender, verify_otp, refresh_Token_gnerator, access_toker_generator, token_manger(add remove expiry token regenerates etc) 
#OAuth in future

def otp_generator ():
    otp = ""
    for i in range(os.environ.get('OTP_LENGTH', 8)):
        otp += str(randint(0,9))
    
    return otp

def email_sender(email,otp,content):

    return True


