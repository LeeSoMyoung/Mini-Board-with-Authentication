'use strict';

require('dotenv').config();

const supertest = require('supertest');
const app = require('../../server/server.js');

const server = supertest.agent(`http://localhost:3000/${process.env.PORT}`);

describe('게시물 변경 테스트', () => {
    it('1. 게시물 수정 실패 테스트', (done) => {
        server.put('/write/8d3c3ad6-f821-4c46-9ab5-970796145d50')
            .send({
                "uid": "5cd08b4e-753d-4467-b5ff-e38386d00749",
                "title": "게시물 수정 실패 테스트",
                "content": "수정 실패"
            }).expect(400)
            .end((err, res) => {
                if (err) {
                    done();
                }
                else {
                    console.log(res.body);
                }
            });
    });

    it('2. 게시물 수정 성공 테스트', (done) => {
        server.put('/write/8d3c3ad6-f821-4c46-9ab5-970796145d50')
            .send({
                "uid": "3667dc36-e34a-4f61-a0cc-090eb979c993",
                "title": "게시물 수정 테스트",
                "content": "수정 성공!"
            })
            .expect(200).end((err, res) => {
                if (err) {
                    done();
                }
                else {
                    console.log(res.body);
                }
            });
    });
});