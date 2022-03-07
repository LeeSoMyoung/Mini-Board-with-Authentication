const should = require('should');
const supertest = require('supertest');

const server = supertest.agent('http://localhost:3000');
const app = require('../../server/server.js');

describe('로그인 테스트================= ',()=>{
    it('1. 로그인 실패의 경우',(done)=>{
        server
        .post('/login')
        .send({
            id:"00000000",
            pw:"0000000000"
        })
        .expect(401)
        .end((err,res)=>{
            if(err){
                done(err);
            }
            else{
                console.log(res.body);
            }
        });
    });
    it('2. 로그인 성공의 경우',(done)=>{
        server
        .post('/login')
        .send({
            id: "aaaaaaaaaa",
            pw: "123456789"
        })
        .expect(200)
        .end((err,res)=>{
            if(err){
                done(err);
            }
            else{
                console.log(res.body);
            }
        });
    });
});