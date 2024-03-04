using Filemanager_Explore.Common;
using Microsoft.AspNetCore.Mvc;

namespace Filemanager_Explore.Controllers
{
    [ApiController]
    [Route("filemanager")]
    public class FilemanagerController
    {
        Filemanager _fm;

        public FilemanagerController(IWebHostEnvironment env)
        {
            //Lay duong dan den thu muc upload trong wwwroot!
            var wwwroot = env.WebRootPath;
            //Noi chuoi de co duong dan den thu muc upload
            var uploadPath = Path.Combine(wwwroot, "upload");
            _fm = new Filemanager(uploadPath);
        }

        [Route("getalldir")]
        public string[] GetAllDirs()
        {
            return _fm.GetAllDirs();
        }


    }
}
