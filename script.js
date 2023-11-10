function getMarkStudent(score) {
  
  const studentScore = score < 55 ? 'Satisfactory' : score < 85 ? 'Good' : score < 100 ? 'Very-Good' : 'Excellent';
  return `<span class="${studentScore.toLowerCase()}">${studentScore}</span>`;
    
}

function getMarkAdmin(mark, lector) {
  const adminScore = mark < 55 ? 'Satisfactory' : mark < 85 ? 'Good' : mark < 100 ? 'Very-Good' : 'Excellent';
  return `<p>Admin score: <span class='${adminScore.toLowerCase()}'>${adminScore}</span></p>\n<span class="lectorClass">Lector: ${lector}</span>`;
}


function getMarkLector(lectorScore, averageStudentScore, lector) {
  const lectorResult = `<p>Lector score: <span class='${lectorScore < 55 ? 'satisfactory' : lectorScore < 85 ? 'good' : lectorScore < 100 ? 'verygood' : 'excellent'}'>${lectorScore < 55 ? 'Satisfactory' : lectorScore < 85 ? 'Good' : lectorScore < 100 ? 'Very-Good' : 'Excellent'}</span></p>`;

  const studentResult = averageStudentScore !== undefined
    ? `<p>Average student score: <span class='${averageStudentScore < 55 ? 'satisfactory' : averageStudentScore < 85 ? 'good' : averageStudentScore < 100 ? 'verygood' : 'excellent'}'>${averageStudentScore < 55 ? 'Satisfactory' : averageStudentScore < 85 ? 'Good' : averageStudentScore < 100 ? 'Very-Good' : 'Excellent'}</span></p>`
    : `<span class="lectorClass">Lector: ${lector}</span>`;

  return lectorResult + studentResult;
}


class User {
  constructor(name, age, img, role, courses) {
      this.name = name;
      this.age = age;
      this.img = img;
      this.role = role;
      this.courses = courses || [];
  }

  renderCourses() {
      const userCoursesDiv = document.createElement("div");
      userCoursesDiv.className = `user__courses ${this.role}--info`;

      this.courses.forEach(course => {
          const courseElement = document.createElement("div");
          courseElement.className = `user__courses--course ${this.role}`;

          if (course.mark) {
              courseElement.innerHTML = `${course.title} ${getMarkStudent(course.mark)}`;
          } else if (course.score) {
              courseElement.innerHTML = `
                  <p>Title: <b>${course.title}</b></p>
                  ${this.role === "admin" ? 
                  getMarkAdmin(course.score, course.lector)
                  : 
                  `${this.role === "lector" ? `${getMarkLector(course.score, course.studentsScore, course.lector)}` : ""}`}
              `;
          }
        
          userCoursesDiv.appendChild(courseElement);
      });

      return userCoursesDiv;
  }

  render() {
      const userDiv = document.createElement("div");
      userDiv.className = "user";

      const userInfoDiv = document.createElement("div");
      userInfoDiv.className = "user__info";

      const userDataDiv = document.createElement("div");
      userDataDiv.className = "user__info--data";

      userDataDiv.innerHTML = `
          <img src="${this.img}" alt="${this.name}" height="50">
          <div class="user__naming">
              <p>Name: <b>${this.name}</b></p>
              <p class="age">Age: <b>${this.age}</b></p>
          </div>
      `;

      const userRoleDiv = document.createElement("div");
      userRoleDiv.className = `user__info--role ${this.role}`;
      userRoleDiv.innerHTML = `
          <img src="${roles[this.role]}" alt="${this.role}" height="25">
          <p>${this.role}</p>
      `;

      userInfoDiv.appendChild(userDataDiv);
      userInfoDiv.appendChild(userRoleDiv);

      userDiv.appendChild(userInfoDiv);

      if (this.courses.length > 0) {
          const userCoursesDiv = this.renderCourses();
          userDiv.appendChild(userCoursesDiv);
      }

      document.querySelector(".users").appendChild(userDiv);
  }
}

class Student extends User {
  constructor(name, age, img, courses) {
      super(name, age, img, "student", courses);
  }
}

class Admin extends User {
  constructor(name, age, img, courses) {
      super(name, age, img, "admin", courses);
  }

  renderCourses() {
      const userCoursesDiv = super.renderCourses();
      userCoursesDiv.className += " admin--info";
      return userCoursesDiv;
  }
}

class Lector extends User {
  constructor(name, age, img, courses) {
      super(name, age, img, "lector", courses);
  }

  renderCourses() {
      const userCoursesDiv = super.renderCourses();
      userCoursesDiv.className += " lector--info";
      return userCoursesDiv;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  users.forEach(user => {
      let newUser;
      if (user.role === "student") {
          newUser = new Student(user.name, user.age, user.img, user.courses);
      } else if (user.role === "admin") {
          newUser = new Admin(user.name, user.age, user.img, user.courses);
      } else if (user.role === "lector") {
          newUser = new Lector(user.name, user.age, user.img, user.courses);
      }

      newUser.render();
  });
});
