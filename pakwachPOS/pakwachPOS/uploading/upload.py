# All Things related to modules
from ..helper import helper
from ..user.users import Users
# helper class

_user = Users()


# master module class
class Upload:
    def __init__(self):
        self.help = helper.Helper()

    def upload(self, output, file):
        destination = open(output, 'wb+')
        for chunk in file.chunks():
            destination.write(chunk)
        destination.close()
        
    ##################
 
