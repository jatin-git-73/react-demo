import { Grid, Typography } from "@mui/material";
interface NoresultProps{
    search_query:string,
    result_count:number
}

const NoResults=(props:NoresultProps)=>{
    const {search_query,result_count} = props;
    let  message="No records are in list please try adding one";
    
    if(search_query!=='' && result_count==0){
        message='No results found for you query `'+search_query+"`,try with any other text";
    }
    return  <div style={{display: 'flex',justifyContent: 'center',flexDirection: 'column',alignContent: 'center',alignItems: 'center'}}
    >
            <div style={{display: 'flex',justifyContent: 'center',flexDirection: 'column',alignContent: 'center',alignItems: 'center'}} >
                <img style={{width:'50%',height:'50%'}} src='/images/no-data.svg'/>
            </div>
            <div >
                <Typography variant='h5' textAlign='center' >{message}</Typography>
            </div>
        </div>

}
export default NoResults;