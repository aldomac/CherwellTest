using System;
namespace CherwellTest
{
    public class Triangle : ITriangle
    {
        public IVertex[] GetVerticesForRowCol(string rowcol)
        {

            // split ID into  Row / Col integers
            //ToDo - could add error checking
            int row = rowcol[0] - 'A';
            int col = int.Parse(rowcol.Substring(1, 2));

            // we could pass the size in if required, but for test will just leave as fixed per the spec
            int w = 10;
            // takes 2 triangles to make up 1 square of size 10 * 10, counted in the columns
            int startx = col / 2 * w;
            int starty = row * w;

            // the orientation of the triangle varies w.r.t to column
            // startx, starty always top left of 2 triangles
            // if column modulo 2 == 0 then right angle is bottom left, else top right
            // write out verts starting at right angle and going clockwise (not needed but consistent)
            if (col % 2 == 0)

                //0,0|\     v2|\
                //   | \      | \
                //10 |__\   v1|__\v3
                //    10
                return new[] {
                    new Vertex { X = startx, Y = starty + w},
                    new Vertex { X = startx, Y = starty },
                    new Vertex { X = startx + w, Y = starty + w }
                };

            else
                //0,0 \- |   v3 \- | v1 
                //     \ |       \ |
                //      \|        \| v2
                //    
                return new[] {
                    new Vertex { X = startx + w, Y = starty },
                    new Vertex { X = startx + w, Y = starty + w},
                    new Vertex { X = startx, Y = starty}
                };
        }

        public string GetRowCol(IVertex v1, IVertex v2, IVertex v3)
        {
            // ToDo - add error checking

            // verts must be passed in from right angle and go clockwise - v3 not needed

            // 2 triangles per column, calc for bottom triangle
            int col = 2 * (v1.X / 10);
            int row = v1.Y / 10  - 1;

            // if not a bottom triangle column needs adjusted as v1.x
            // is right side. Row is +1 as v1y is 10 less
            if (v1.Y < v2.Y)
            {
                col--;
                row++;
            }

            string rowchars = "ABCDEF";
            col++; // inc from zero index

            // return formatted as 1 byte row, 2 byte col, ie A12
            return rowchars.Substring(row, 1) + col.ToString("D2");   

        }

    }
}
