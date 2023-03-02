export default async function makeApiCall(url, options){

    let data, error;
   
    try{
        const response = await fetch(url, options);
        data = await response.json();

    }catch(err){
        error = err;
    }
    return {data, error};
}