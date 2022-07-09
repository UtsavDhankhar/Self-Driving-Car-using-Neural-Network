function lenv(A,B,C){
    return A +(B-A)*C;
}


function getintersection(a,b,c,d){

    const tTop = (d.x - c.x)*(a.y - c.y) - (d.y - c.y)*(a.x - c.x);
    const utop = (c.y - a.y)*(a.x - b.x) - (c.x - a.x)*(a.y - b.y);
    const bottom = (d.y - c.y)*(b.x - a.x) - (d.x - c.x)*(b.y - a.y);

    if(bottom!=0){

        const t = tTop/bottom;
        const u = utop/bottom;

        if(t>=0 && t<=1 && u >=0 && u<=1){

            return {
                x: lenv(a.x , b.x , t),
                y: lenv(a.y , b.y , t),
                offset: t
            };
        }
    }

    return null;

}