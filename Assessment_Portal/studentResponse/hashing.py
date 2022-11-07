import random

# Function for random shuffle 
def randomShuffler():
    return random.random()

# Shuffle Roll Numbers of students for peer evaluation 
def shuffleRollNumbers(studentRollNumbers):
    
    numberOfStudents = len(studentRollNumbers)
    shuffledStudentRollNumbers = studentRollNumbers
    
    random.shuffle(shuffledStudentRollNumbers, randomShuffler)
    
    return shuffledStudentRollNumbers


# Hash student roll numbers with random students 
def hashIndexes(studentRollNumbers):
    
    numberOfStudents = len(studentRollNumbers)
    
    mapOfRollNumbers = {}
    hashedStudentsDictionary = {}
    
    for rollNo in range(len(studentRollNumbers)):
        mapOfRollNumbers[rollNo] = studentRollNumbers[rollNo]
        hashedStudentsDictionary[studentRollNumbers[rollNo]] = "1"
        
    shuffledStudentRollNumbers = shuffleRollNumbers(studentRollNumbers)
    
    for rollNo in range(len(studentRollNumbers)):
        mapOfRollNumbers[rollNo] = shuffledStudentRollNumbers[rollNo]
        hashedStudentsDictionary[studentRollNumbers[rollNo]] = mapOfRollNumbers[rollNo]
        
    for rollNo in range(len(studentRollNumbers)):
        if(mapOfRollNumbers[rollNo] == hashedStudentsDictionary[mapOfRollNumbers[rollNo]]):
            hashedStudentsDictionary[mapOfRollNumbers[(rollNo) % numberOfStudents]], hashedStudentsDictionary[mapOfRollNumbers[(rollNo + 1) % numberOfStudents]] = hashedStudentsDictionary[mapOfRollNumbers[(rollNo + 1) % numberOfStudents]], hashedStudentsDictionary[mapOfRollNumbers[(rollNo) % numberOfStudents]]
    
    return hashedStudentsDictionary
