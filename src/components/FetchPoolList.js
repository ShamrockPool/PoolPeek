import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

export default class FetchPoolList extends React.Component {
    state = {
        loading: true,
        pools: null
    }

    async componentDidMount() {
        const url = "http://poolpeek.com/api.asp?k=838967e9-940b-42db-8485-5f82a72a7e17&page=1";
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.poolpeek);
        this.setState({ pools: data.poolpeek, loading: false })
        
    }


    render() {
            if(this.state.loading){
                return <div>loading...</div>
            }

            if(!this.state.pools){
                return <div>Pools not found...</div>
            }

            const renderPools = this.state.pools.map(pool => (
            <li key={pool.pool_id}>
                {pool.ticker}
            </li>
            ));

            return (

            <ul>
                renderPools
            </ul>

                // <div>{
                // for(var i=0; i < this.state.pools.poolpeek.pools.length; i++)
                // {
                //     //CREATE THE TABLE 
                //     <Card className="mb-3">
                //         <CardHeader>{this.state.pools.poolpeek.pools[i].name}</CardHeader>
                //         <CardBody>
                //         <Row>
                //             <Col>
                //             <Card body>
                //                 <Table>
                //                 <tbody>
                //                     <tr>
                //                     <th scope="row">Pool Id</th>
                //                     <td>be7e2461a584b6532c972edca711fa466d7d0e8a86b6629fc0784ff6</td>
                //                     </tr>
                //                     <tr>
                //                     <th scope="row">Website</th>
                //                     <td><a href="https://shamrock-pool.com/" target="_blank" rel="noreferrer">https://shamrock-pool.com/</a></td>
                //                     </tr>
                //                     <tr>
                //                     <th scope="row">Produced Blocks</th>
                //                     <td>7</td>
                //                     </tr>
                //                     <tr>
                //                     <th scope="row">Pool Info</th>
                //                     <td>Pool margin: 0%    Pledge: 30,003 ₳     Cost per epoch: 340 ₳</td>
                //                     </tr>
                //                     <tr>
                //                     <th scope="row">Stake</th>
                //                     <td>Active Stake: 3,190,455.24 ₳     Delegators: 14</td>
                //                     </tr>
                //                 </tbody>
                //                 </Table>
                //             </Card>
                //             </Col>
                //         </Row>
                //         </CardBody>
                //     </Card>
                // }}</div>
            )
    }
}