const should = require('should');
const supertest = require('supertest');

const server = supertest.agent('http://localhost:3000');

describe('회원가입 테스트================= ',()=>{
    it('회원가입 성공의 경우',(done)=>{
        server
        .post('/signup')
        .send({
            id: "abcdefghijk",
            pw: "123456789",
            pw_repeat: "123456789",
            username: "00000000"
        })
        .expect(201)
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