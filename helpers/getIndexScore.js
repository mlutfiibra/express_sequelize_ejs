module.exports = (studentSubject) => {
    if(studentSubject.score===null){
        return studentSubject.scoreLetter="Empty"
    }else if(studentSubject.score >85) {
        return studentSubject.scoreLetter="A"
    }else if(studentSubject.score>70) {
        return studentSubject.scoreLetter="B"
    }else if(studentSubject.score>55) {
        return studentSubject.scoreLetter="C"
    }else if(studentSubject.score<=55) {
        return studentSubject.scoreLetter="E"
    }
}