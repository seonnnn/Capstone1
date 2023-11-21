import React, { useState, useEffect } from 'react';
import './UserLogComponent.css';


const UserLogComponent = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [logs, setLogs] = useState([]);

    const [filterIp, setFilterIp] = useState(''); // IP 필터 상태 추가
    const [filterApp, setFilterApp] = useState(''); // 어플리케이션 필터 추가

    useEffect(() => {
        fetch('/test.txt')
            .then((response) => response.text())
            .then((text) => {
                const logsArray = text.trim().split('\n').map((logLine) => {
                    const [app, , status, ip, dateTime] = logLine.split(' / ');
                    const [dateStr, time] = dateTime.split(' ');
                    const date = dateStr.replace(/-/g, '.'); // '2023-08-29'를 '2023.08.29'로 변환
                    return { date, ip, app: app.trim(), time, status: status.trim() };
                });
                setLogs(logsArray);
            });
    }, []);

    const handleFilterChange = (e) => {
        setFilterIp(e.target.value);
    };

    const handleFilterAppChange = (e) => {
        setFilterApp(e.target.value);
    };
    
    const filteredLogs = () => {
        return logs.filter(log => {
            return (filterIp === '' || log.ip === filterIp) &&
                   (filterApp === '' || log.app.includes(filterApp)); // 앱 이름 포함 여부로 필터링
        });
    };


    const searchLogs = () => {
        if (!startDate && !endDate) {
            return logs;
        }
        const start = startDate.replace(/\./g, '-');
        const end = endDate.replace(/\./g, '-');
        return logs.filter(log => {
            const logDate = log.date.replace(/\./g, '-');
            return logDate >= start && logDate <= end;
        });
    };


    return (
        <div className="container">
            <h1 className="title">사용자 로그 조회</h1>
            {/* 필터 UI 부분 */}
            <div className="filter-section">
                <select onChange={handleFilterChange} value={filterIp}>
                    <option value="">모든 IP</option>
                    {[...new Set(logs.map(log => log.ip))].map(ip => (
                        <option key={ip} value={ip}>{ip}</option>
                    ))}
                </select>
                 <select onChange={handleFilterAppChange} value={filterApp}>
                    <option value="">모든 어플리케이션</option>
                    {[...new Set(logs.map(log => log.app))].map(app => (
                        <option key={app} value={app}>{app}</option>
                    ))}
                </select>
            </div>

            <div className="search-section">
                <label htmlFor="startDate">시작일자: </label>
                <input type="date" id="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} />

                <label htmlFor="endDate">종료일자: </label>
                <input type="date" id="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} />

                <button onClick={searchLogs}>조회</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>방문일자</th>
                        <th>IP주소</th>
                        <th>애플리케이션</th>
                        <th>접속 시간</th>
                        <th>상태</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLogs().map((log, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{log.date}</td>
                            <td>{log.ip}</td>
                            <td>{log.app}</td>
                            <td>{log.time}</td>
                            <td>{log.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserLogComponent;
