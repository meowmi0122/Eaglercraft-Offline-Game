// Games/files.js

import fs from "fs"
import path from "path"

export default function handler(req,res){

const dir=process.cwd()

const items=fs.readdirSync(dir,{withFileTypes:true})

const files=items
.filter(item=>
!item.name.startsWith(".") &&
item.name!=="node_modules" &&
item.name!=="api"
)
.map(item=>({
name:item.name,
type:item.isDirectory() ? "folder" : "file"
}))

res.status(200).json(files)

}