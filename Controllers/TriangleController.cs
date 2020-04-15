using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CherwellTest.Controllers
{
    public class TriangleController : Controller
    {

        // return triangle vertices for a given Column and Row
        [HttpGet("FromRowCol")]
        public ActionResult<IEnumerable<IVertex>> FromRowCol(string id)
        {
            Triangle t = new Triangle();
            return t.GetVerticesForRowCol(id);
        }

        // return Row And Column for given vertices
        [HttpGet("GetRowCol")]
        public ActionResult<string> GetRowCol(string id)
        {
            Vertex v1 = new Vertex { X = int.Parse(id.Substring(0,2)),   Y = int.Parse(id.Substring(2, 2)) };
            Vertex v2 = new Vertex { X = int.Parse(id.Substring(4, 2)), Y = int.Parse(id.Substring(6, 2)) };
            Vertex v3 = new Vertex { X = int.Parse(id.Substring(8, 2)), Y = int.Parse(id.Substring(10, 2)) };

            Triangle t = new Triangle();
            return t.GetRowCol(v1, v2, v3);
         }

    }
}