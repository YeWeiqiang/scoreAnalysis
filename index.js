var myChart = echarts.init(document.getElementById('rory'));

myChart.setOption({
    color:'#b4ffec',
    grid:{
        y: 50,
        height: 400,


    },
    tooltip: {},
    xAxis: {
        axisLine: {
            lineStyle:{            //设置x轴的坐标字体颜色
                color:'#ffffff'
            }
        },
        axisLabel: {
            interval:0,
            rotate:35,
            // formatter:function(value)
            // {
            //     return value.replace("(", "·").replace("（", "·").replace(")", "").replace("）", "").split("").join("\n");
            // }

            // formatter:function(value)
            // {
            //     value = value.replace('一', '1').replace("(", "━").replace("（", "━").replace(")", "").replace("）", "");
            //     var ret = "";//拼接加\n返回的类目项
            //     var maxLength = 2;//每项显示文字个数
            //     var valLength = value.length;//X轴类目项的文字个数
            //     var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
            //     if (rowN > 1)//如果类目项的文字大于3,
            //     {
            //         for (var i = 0; i < rowN; i++) {
            //             var temp = "";//每次截取的字符串
            //             var start = i * maxLength;//开始截取的位置
            //             var end = start + maxLength;//结束截取的位置
            //             //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
            //             temp = value.substring(start, end) + "\n";
            //             ret += temp; //凭借最终的字符串
            //         }
            //         return ret;
            //     }
            //     else {
            //         return value;
            //     }
            // }

        },
        data: []
    },
    yAxis: {
        splitLine: { show: false },//去除网格线
        name: '',
        min: 60,
        max: 100,
        axisLine: {             //设置y轴的坐标字体颜色
            lineStyle:{
                color:'#ffffff'
            }
        }
    },
    series: [{
        barWidth: "30px",

        type: 'bar',
        itemStyle: {
            normal: {
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#333'
                    }
                }
            }
        },
        data: []
    }]
});


function updateAjax(X,Y){
    // myChart.showLoading();
    var names = [];
    var nums = [];
    var nameText = "";
    var list1=[];
    var list11=[];
    var list2=[];
    var list22=[];
    var list3=[];
    var list33=[];
    var list4=[];
    var list44=[];

    if(X ==='2017-2018' && Y === 1.0){
        nameText = '2017-2018学年第1学期成绩图—大一（上）'
    }
    else if(X ==='2017-2018' && Y === 2.0){
        nameText = '2017-2018学年第2学期成绩图—大一（下）'
    }
    else if(X ==='2018-2019' && Y === 1.0){
        nameText = '2018-2019学年第1学期成绩图—大二（上）'
    }
    $.ajax({
        type: 'get',
        url: 'grade.json',//请求数据的地址
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            colorList = [];
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            $.each(result, function (index, item) {
                if(item['XN'] === X && item['XQ'] === Y){
                    //console.log(typeof(item['XQ']) + "*****" + typeof(item['XQ'].toString()));
                    // names.push(item['KCMC']);    //挨个取出类别并填入类别数组                    
                    // nums.push(item['CJ']);    //挨个取出销量并填入销量数组
                    if(item['KCXZ'] === "公共必修课"){
                        colorList.push('#e3c0e9');
                        list1.push(item['KCMC']);
                        list11.push(item['CJ']);
                    }
                    else if(item['KCXZ'] === "公共选修课"){
                        colorList.push('#a3e698')
                        list2.push(item['KCMC']);
                        list22.push(item['CJ']);
                    }
                    else if(item['KCXZ'] === "专业核心课"){
                        colorList.push('#78e2ff')
                        list3.push(item['KCMC']);
                        list33.push(item['CJ']);
                    }
                    else if(item['KCXZ'] === "实践教学"){
                        colorList.push('#f3b5a8')
                        list4.push(item['KCMC']);
                        list44.push(item['CJ']);
                    }

                }
            });

            names.push(list1.toString());
            debugger
            // names.push(list2.forEach());
            // names.push(list3);
            // names.push(list4);
            nums.push(list11.toString());
            // nums.push(list22);
            // nums.push(list33);
            // nums.push(list44);

            myChart.hideLoading();    //隐藏加载动画
            myChart.setOption({        //加载数据图表
                title:{
                    left:60,
                    text: nameText,
                    textStyle:{
                        color: "#ffffff",
                    },
                },
                legend:{
                    data:[{
                        name:['实践教学', '公共选修课', '公共必修课', '专业核心课']
                    }]
                },
                xAxis: {
                    data: names,
                },
                series: [
                    {
                    // 根据名字对应到相应的系列
                    name: "实践教学",  //显示在上部的标题
                    data: nums,
                    normal: {color: '#ff4c2f'},
                    itemStyle: {
                        normal:{
                            fontStyle:{
                                color: '#ffffff',
                            },
                            color: function (params){
                                return colorList[params.dataIndex];
                            }
                        }
                    }
                }
                    // {
                    //     name:"实践教学",
                    //
                    // }
                ]
            });
        },
        error: function (errorMsg) {
            //请求失败时执行该函数
            alert("图表请求数据失败!");
            myChart.hideLoading();
        }
    });
}
updateAjax('2017-2018',1.0);


//
// $(function () {
//
//     setInterval("updateAjax('2017-2018', 1.0)", 1000);
//     setInterval("updateAjax('2017-2018', 2.0)", 1000);
//     setInterval("updateAjax('2018-2019', 1.0)", 1000);
//
// })
