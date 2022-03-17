import * as d3 from "d3";
// const dataX:Array<string>=[
//     'a', 'b', 'c', 'd', 'e', 'f',
//     'g', 'h', 'i', 'j', 'k', 'l',
//     'm', 'n', 'o', 'p', 'q', 'r',
//     's', 't', 'u', 'v', 'w', 'x',
//     'y', 'z'
//   ];
//   const dataY:Array<number> =
//   [
//     4, 0, 2, 0, 9, 0, 1, 4,
//     5, 0, 0, 4, 0, 4, 4, 0,
//     0, 0, 5, 4, 1, 0, 1, 0,
//     1, 0
//   ]
const drawChart = (dataY:Array<number>)=>{
    const width = 500;
    const height = 600;
    const scaleFactor =30;
    const barHeight=20;
    const xscale = d3.scaleLinear().domain([0,d3.max(dataY)]).range([0,width-100]);
    const yscale = d3.scaleLinear().domain([0,dataY.length]).range([height/2,0])
    let bottom_axis = d3.axisBottom(xscale);
    console.log('xscale=',xscale);
    let left_axis = d3.axisLeft(yscale);
    d3.select('svg').remove();
    let svg =d3.select('#chart1')
    .append('svg')
    .attr('width',width)
    .attr('height',height)//barHeight*26)
    .style('border', '1px solid blue')
    .style('background-color', '#a7d')
     .style('padding','30px')
    //  .style('padding-left','50px')
    let bar = svg.selectAll('g')
    .data(dataY)
    .enter()
    .append('g')
    .attr('transform',(d:any, i:number)=>{
        return `translate(0,${i*barHeight})`
    });
    bar.append('rect')
    .attr('width',function(d:any){ return xscale(d)})//d*scaleFactor})
    .attr('height', barHeight-1)
    .attr('fill','#1e6324')
    bar.selectAll('rect')
    .on('mouseover',function(){
        d3.select(this).style('fill','yellow')
        .style('cursor','pointer')
    })
    bar.selectAll('rect')
    .on('mouseout',function(){
        d3.select(this).style('fill','#1e6324')
        .style('cursor','normal')
    })

    let text= svg.selectAll('text')
    .data(dataY)
    .enter()
    .append('text')
    .attr('x',(d:any)=>  xscale(d)+15)
    .attr('y',(_:any, i:number)=>15+ i*barHeight)
    .text((d:any)=> d)

    svg.append('g')
    .attr('transform',`translate(0,${height-80})`)
    .call(bottom_axis)
}


export default drawChart;