 readline = require('readline');
 const fs = require('fs');
 var header =[];
 var jsonData=[],jsonData2=[],jsonData3=[];
 var tempData={},tempData2={},tempData3={};
 var over=[],under=[],noArrest=[];
 var i=0,j=0,k=0;
 var property=[5,6,7,9],
 violent=["01A","2","3","04A","04B"],
 oneType=["08A","08B","10","11","12","13","14","15","16","17","18","19","20","21","22","24","26"];
 var arrested=[],nonIndexCrime=0,violentCrimes=0,propertyCrimes=0;
 var year=0,type=0,description=0,arrest=0,code=0,crimeYear=0;
 for(i=0 ;i<=15;i++)
 {
  over[i]=0;
  under[i]=0;
  arrested[i]=0;
  noArrest[i]=0;
}
var isHeader=true;
const rl = readline.createInterface({

  input: fs.createReadStream('csv/Crimes_-_2001_to_present.csv')

});
rl.on('line', function(line)
{
 var lineRecords= line.trim().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);;
 for(var i=0;i<lineRecords.length;i++)
 {
   if(isHeader)
   {       
     header[i]=lineRecords[i];
     if(header[i]=="Year")
     {
       year=i;
     }
     if(header[i]=="Description")
     {
       description=i;
     }
     if(header[i]=="Arrest") 
     {
       arrest=i;
     }
     if(header[i]=="Primary Type")
     {
       type=i;
     }
     if(header[i]=="FBI Code")
     {
      code=i;
    }
  }
}
 
   if(lineRecords[type]=="THEFT" && lineRecords[description]=="OVER $500")
   {

    over[lineRecords[year]-2001]++;
  }
  else if(lineRecords[type]=="THEFT" && lineRecords[description]=="$500 AND UNDER")
  {
    under[lineRecords[year]-2001]++;
  }
  else if(lineRecords[type]=="ASSAULT" && lineRecords[arrest]=="true")
  {
    arrested[lineRecords[year]-2001]++;
  }
  else if(lineRecords[type]=="ASSAULT" && lineRecords[arrest]=="false")
  {
    noArrest[lineRecords[year]-2001]++;
  }




  if(lineRecords[year]==2015)
  {
    crimeYear=lineRecords[year];    
    for(k=0;k<=oneType.length;k++)
    {  
      if(lineRecords[code]==oneType[k])
      {
        nonIndexCrime++;
      }
    }

    for(k=0;k<=property.length;k++)
    {
      if(lineRecords[code]==property[k])
        propertyCrimes++;
    }
    for(k=0;k<=violent.length;k++)
    {
      if(lineRecords[code]==violent[k])
        violentCrimes++;
    }
  }
  isHeader=false;
});

rl.on('close',function()
{
  for(var i=0;i<=15;i++)
  {
    
    tempData={};
    tempData["Year"]=i+2001;
    tempData["Over $500"]=over[i];
    tempData["Under $500"]=under[i];
    jsonData.push(tempData);
    

    tempData2={};
    tempData2["Year"]=i+2001;
    tempData2["Arrested"]=arrested[i];
    tempData2["Not Arrested"]=noArrest[i];
    jsonData2.push(tempData2);
    
  }
  tempData3={};
  tempData3["Year"]=crimeYear;
  tempData3["Non Index Crimes"]=nonIndexCrime;
  tempData3["Property Crimes"]=propertyCrimes;
  tempData3["Violent Crimes"]=violentCrimes;
  jsonData3.push(tempData3);

  fs.writeFileSync("json/theft.json",JSON.stringify(jsonData),encoding="utf8");
  console.log("Writtten to file1");
  fs.writeFileSync("json/assault.json",JSON.stringify(jsonData2),encoding="utf8");
  console.log("Written to file 2");
  fs.writeFileSync("json/crimes.json",JSON.stringify(jsonData3),encoding="utf8");
  console.log("written to file 3");
});