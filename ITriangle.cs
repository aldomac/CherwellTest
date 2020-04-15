using System;
namespace CherwellTest
{
    public interface ITriangle
    {
        public IVertex[] GetVerticesForRowCol(string rowcol);
        public string GetRowCol(IVertex v1, IVertex v2, IVertex v3);
    }
}
