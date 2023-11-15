import mongoose from "mongoose";

import StudentModel from "./student.model.js";
import CourseModel from "./course.model.js";

const test = async () => {
    const URI = 'mongodb+srv://developer:kuppyr-Nospuc-dubre8@cluster0.qnxcwcg.mongodb.net/school';
    await mongoose.connect(URI);
    // Esquema de ingreso de estudiantes a la
    // base de datos de mongoDB.
    // await StudentModel.create({
    //     first_name: 'Pedro',
    //     last_name: 'Avila',
    //     email: 'pa@mail.com',
    //     gender: 'M'
    // });

    // await CourseModel.create({
    //     title: 'Backend',
    //     description: 'Curso de backend con node js.',
    //     difficulty: 8,
    //     professor: 'Jose Lopez',
    // });
    
    // const student = await StudentModel.findOne({ first_name: 'Pedro'})
    // const cid = '655551cb42a32099497560ea';
    // student.courses.push({ course: cid });
    // const result = await StudentModel.updateOne({ _id: student._id }, student);
    // console.log('result', result);

    const student = await StudentModel.find().populate('courses.course');
    console.log('student', JSON.stringify(student, null, 2));
}

test();