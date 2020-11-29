import axios from 'axios';

export async function getUserData()
{    
    const response = await axios.get('https://api.github.com/users/ProudBloom');
  
    const { data } = response;
    console.log(data);
    return data;
}