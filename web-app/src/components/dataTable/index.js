import StartFirebase from '../firebaseConfig/index';
import React from 'react';
import { ref, onValue } from 'firebase/database';
import { Table } from 'react-bootstrap';

const db = StartFirebase();

export class RealTimeData extends React.Component {
    constructor() {
        super();
        this.state = {
            tableData: [],
        };
    }

    componentDidMount() {
        const dbRef = ref(db, 'Students');
        onValue(dbRef, snapshot => {
            let records = [];
            snapshot.forEach(childSnapshot => {
                let regNo = childSnapshot.key;
                let data = childSnapshot.val();
                records.push({ key: regNo, data: data });
            });
            this.setState({ tableData: records });
        });
    }

    render() {
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Sr. No.</th>
                        <th>Reg. No.</th>
                        <th>Name</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.tableData.map((row, index) => {
                        const targetCoors = 10.8712988 + 76.9263138;
                        const currCoors = row.data.lat + row.data.long;
                        const maxCoors = targetCoors + 0.2;
                        const minCoors = targetCoors - 0.2;
                        if (row.data.face_recognized) {
                            console.log('if running');
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{row.key}</td>
                                    <td>{row.data.name}</td>
                                    <td>
                                        {currCoors < maxCoors &&
                                        currCoors > minCoors
                                            ? 'Present'
                                            : 'Absent'}
                                    </td>
                                </tr>
                            );
                        } else {
                            console.log('else running');
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{row.key}</td>
                                    <td>{row.data.name}</td>
                                    <td>Absent</td>
                                </tr>
                            );
                        }
                    })}
                </tbody>
            </Table>
        );
    }
}
