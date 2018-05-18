'use strict';
const marked=require('marked');
const fs=require('fs');
const path=require('path');

const html ='./html&css/';
const js ='./javascript/';
const tempPath='../template/template.html';

//原始文件
let orginal=path.join(__dirname,html+'01_flex布局.md');
let res=path.join(path.dirname(orginal),path.basename(orginal, '.md')+'.html') ;

//读取模板文件
fs.readFile(tempPath,'utf-8',(err,temp)=>{
	if (err) return console.error('模板读取错误');
	// 读取md文件
	fs.readFile(orginal,'utf-8',(err,data)=>{
		if (err) return console.error('读取md文件出错');
		let html=marked(data.toString());
		// 去除marked转换中带有的id
		html=html.replace(/id=\".*\"/g,'')
		temp=temp.replace('@markdown',html);
		// 写入新的文件
		fs.writeFile(res,temp,(err)=>{
			if (err) return console.error('写入出错');
			console.log('写入文件成功');
		})
	})
});



