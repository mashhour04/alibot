import React, { Component } from 'react';
import { Container } from 'reactstrap';
import ReactTable from 'react-table';
export default class ReactTables {
    render() {
        const { vendor, tables } = this.props;
        const { loading } = vendor;
        const { selectDayOfWeek } = this.state;
        const columns = ['name']
        const columns = [{
            Header: () => <th className="jsgrid-header-cell jsgrid-header-sortable">Name</th>,
            accessor: 'name',
            Cell: props => {
                if (props.value === 'input') {
                    return (<div className="jsgrid-cell"><Input className="" type="text" /></div>)
                } else {
                    return (<div className="jsgrid-cell">{props.value}</div>)
                }
            }
        }, {
            Header: () => <th className="jsgrid-header-cell jsgrid-header-sortable">Capacity</th>,
            accessor: 'capacity',
            Cell: props => {
                if (props.value === 'input') {
                    return (<div className="jsgrid-cell"><Input className="" type="number" /></div>)
                } else {
                    return (<div className="jsgrid-cell">{props.value}</div>)
                }
            }
        },
        {
            Header: () => <th className="jsgrid-header-cell jsgrid-header-sortable">Availbility</th>,
            accessor: 'availbility',
            Cell: props => {
                console.log('options', daysOfWeek)
                if (props.value === 'input') {
                    return (
                        <Select
                            value={selectDayOfWeek}
                            onChange={this.handleChange}
                            isMulti
                        />
                    )
                }
            }
        }
        ]
        return (
            < div className="jsgrid-grid-header jsgrid-header-scrollbar" >
                <Container>
                    <ReactTable
                        minRows={1}
                        data={tables}
                        columns={columns}
                        loading={loading}
                        defaultSortDesc={true}
                        resizable={true}
                        showPagination={false}
                        getTrProps={(state, rowInfo, column) => {
                            return {
                                style: {
                                    verticalAlign: 'middle'
                                }
                            }
                        }}
                    >
                    </ReactTable>
                </Container>
            </div >
        )
    }
}