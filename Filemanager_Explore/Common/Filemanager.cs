namespace Filemanager_Explore.Common
{
    public class Filemanager
    {
        protected string _rootPath;

        public Filemanager(string rootPath)
        {
            _rootPath = rootPath;
        }

        public string[] GetAllDirs()
        {
            var dirs = Directory.GetDirectories(_rootPath, "*", SearchOption.AllDirectories);
            for (int i = 0; i < dirs.Length; i++)
            {
                dirs[i] = dirs[i].Replace(_rootPath, string.Empty).Trim(Path.DirectorySeparatorChar); //.Trim(Path.PathSeparator) de loai bo dau \\ den folder
            }
            return dirs.OrderBy(x=>x).ToArray();

        }





    }
}
