import axios from "axios";

export default function AddUser(data){

const datas = {
    "number":data.number,
    "password":data.password,
    "email":data.email,
    "name":data.name,
    "surname":data.surname
}
axios.post("kairos-a-pi.vercel.app/register",datas).then((res)=>{console.log(res)}).catch((err)=>{console.log("error",err)})
}