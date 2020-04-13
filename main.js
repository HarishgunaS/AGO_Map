function printDirections()
{
    performance.mark("start");
    //var data = '{"size" = 4,"map" : [[0,1,0,0],[1,0,1,0],[0,1,0,1],[0,0,1,0]]}';
    var p = document.getElementById("p");
    var start = parseInt(document.getElementById("start").value)-400;
    var end = parseInt(document.getElementById("end").value)-400;
    //var parsed = JSON.parse(data);
    var size = 12;//var size = 4;//parsed["size"];
    var map = [[0,1,0,0,0,0,1,1,0,0,0,0],[1,0,1,1,0,0,0,0,1,0,1,0],[0,1,0,1,1,0,0,0,0,0,0,0],[0,1,1,0,1,0,0,0,0,1,1,0],[0,0,1,1,0,1,0,0,0,0,0,1],[0,0,0,0,1,0,1,0,0,0,0,1],[1,0,0,0,0,1,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,0,0,0,0,0,0,0],[0,1,0,1,0,0,0,0,0,0,0,0],[0,0,0,0,1,1,0,0,0,0,0,0],];//var map = [[0,1,0,0],[1,0,1,0],[0,1,0,1],[0,0,1,0]];//parsed["map"];
    path = BFS(map, start, end, size);
    p.innerHTML = "Here are your directions:<br>"
    for (i = 0; i < path.length; i++)
    {
        p.innerHTML += String(i+1) + ". Room " + path[i] + "<br>";
    }
    performance.measure("duration", "start");
    console.log(performance.getEntriesByType("measure"));
    performance.clearMarks();
    performance.clearMeasures();
}

function BFS(map, start, end, size)
{
    var stack = [start];
    var previousNode = new Array(size).fill(-1);
    while (stack.length > 0)
    {
        var i = stack.shift();
        for (j = 0; j < size; j++)
        {
            if (map[i][j] == 1 && previousNode[j] == -1)
            {
                stack.push(j);
                previousNode[j] = i;
                if (j == end)
                {
                    stack = [];
                }
            }
        }
    }
    if (previousNode[end] == -1)
    {
        return ("Error");
    }
    current = end;
    path = [];
    while (current != start)
    {
        path.push(current+400);
        current = previousNode[current];
    }
    path.push(current+400);
    path.reverse();
    return path;
}
