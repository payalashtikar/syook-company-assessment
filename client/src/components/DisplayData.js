import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';

export const DisplayData = () => {
    const [data, setData] = useState([]);
    const [successRate, setSuccessRate] = useState(0);

    useEffect(() => {
        const socket = socketIOClient('http://localhost:8080'); // Replace with your server URL
        console.log('socket : ', socket)
        socket.on('dataStream', handleNewData);
        fetchInitialData();

        return () => {
            socket.off('dataStream', handleNewData);
            socket.disconnect();
        };
    }, []);

    const handleNewData = (newData) => {
        setData((prevData) => [...prevData, newData]);
        // setSuccessRate(calculateSuccessRate(newData));
        setSuccessRate(calculateSuccessRate([...data, newData]));
    };

    const fetchInitialData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/data'); // Replace with your backend API URL
            // const data = await response.json()
            console.log('response : ', response)
            // console.log('response data : ', data)
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const calculateSuccessRate = (newData) => {
        // Calculate the number of valid data items
        const validDataCount = newData.reduce((count, item) => {
            const isValid = item.secretKey === generateSecretKey(item);
            return isValid ? count + 1 : count;
        }, 0);

        // success rate as a percentage
        const totalDataCount = newData.length;
        const successRate = (validDataCount / totalDataCount) * 100;
        console.log('successRate : ', successRate)
        return successRate;
    };

    // secret key generation function
    const generateSecretKey = (item) => {
        return crypto
            .createHash('sha256')
            .update(JSON.stringify(item))
            .digest('hex');
    };

    const thtdstyle = {
        border: '1px solid #dddddd',
        textAlign: 'left',
        padding: '5px 10px',
        margin: '0px 15px'
    }


    return (
        <>
            <div className="container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h1>All Data</h1>
                <p>Success Rate : {successRate.toFixed(2)}%</p>
                <table style={{ borderCollapse: 'collapse', margin: '30px auto', width: '60%' }}>
                    <thead>
                        <tr>
                            <th style={thtdstyle} >NAME</th>
                            <th style={thtdstyle}>ORIGIN</th>
                            <th style={thtdstyle}>DESTINATION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((val, index) => {
                            return (
                                <tr key={index}>
                                    <td style={thtdstyle}>{val.name}</td>
                                    <td style={thtdstyle}>{val.origin}</td>
                                    <td style={thtdstyle}>{val.destination}</td>
                                </tr>
                            )
                        })}
                    </tbody>

                </table>
            </div>

        </>
    )
}