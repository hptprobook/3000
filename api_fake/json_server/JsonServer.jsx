import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
function JsonServer() {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/users')
        .then(res => setData(res.data))
        .catch(err =>console.log(err))

    },[]);
        return (<div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d,i)=> {
                        return <tr key={i}>
                            <td>{d.id}</td>
                            <td>{d.name}</td>
                            <td>{d.email}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
        )
}
export default JsonServer