using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestSecond.services
{
    public class UserCreator
    {
        public static Model.User UserWitchInfoFromFile()
        {
            Model.User user = Utils.Utils.GetInfoFromFile();
            return user;

        }
    }
}
