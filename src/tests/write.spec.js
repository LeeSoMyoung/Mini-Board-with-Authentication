'use strict';

const should = require('should');
const supertest = require('supertest');

const server = supertest.agent('http://localhost:3000');

describe('게시물 작성 테스트=============', () => {
    
    it('1. 게시물 작성 실패 - 제목이 입력 안 된 경우', (done) => {
        server.post('/write')
        .send({
            "uid": "119b92e8-a9ba-4d4b-833b-99e177d3f279",
            "content":"게시물 작성 실패 테스트"
        })
        .expect(400)
        .end((err,res)=>{
            if(err){
                done();
            }
            else{
                console.log(res.body);
            }
        });
    });

    it('2. 게시물 작성 실패 - 내용이 입력 안 된 경우', (done) => {
        server.post('/write')
        .send({
            "uid": "119b92e8-a9ba-4d4b-833b-99e177d3f279",
            "title":"게시물 작성 실패 테스트"
        })
        .expect(400)
        .end((err,res)=>{
            if(err){
                done();
            }
            else{
                console.log(res.body);
            }
        });
    });

    it('3. 게시물 작성 성공의 경우', (done) => {
        server.post('/write')
        .send({
            "uid": "119b92e8-a9ba-4d4b-833b-99e177d3f279",
            "title":"write test",
            "content":"게시물 작성 성공 테스트"
        })
        .expect(200)
        .end((err,res)=>{
            if(err){
                done();
            }
            else{
                console.log(res.body);
            }
        });
    });
});