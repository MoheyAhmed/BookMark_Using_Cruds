// siteName
// siteUrl
// bodyContent

let allWebsites = JSON.parse(localStorage.getItem("allwebsitesLinks")) || [];
displayWebsites(allWebsites);

function addSite() {
  if (isValid()) {
    let site = {
      siteName: siteName.value,
      siteURL: siteUrl.value,
    };
    allWebsites.push(site);
    //   console.log(allWebsites);
    Swal.fire({
      title: "Good job!",
      text: "Your link Added Successfuly ",
      icon: "success",
    });
    displayWebsites(allWebsites);
    localStorage.setItem("allwebsitesLinks", JSON.stringify(allWebsites));
    clearData();
    siteName.classList.remove('is-valid');
    siteName.classList.remove('is-invalid');
    siteUrl.classList.remove('is-valid');
    siteUrl.classList.remove('is-invalid');
  } else {
    Swal.fire({
      title: "Bad job!",
      text: "Your link Not Added!",
      icon: "error",
    });
  }
}

function displayWebsites(array) {
  let bodyHtmlContainer = "";
  for (let i = 0; i < array.length; i++) {
    bodyHtmlContainer += `
        <tr>
            <td>${i + 1}</td>
            <td>${array[i].siteName}</td>
            <td><a href="${
              array[i].siteURL
            }" target = "_blank" class="btn btn-secondary text-white"> <i class="fad fa-eye"></i> Visit</a></td>
            <td><button onclick = "deleteURL(${i})" class="btn btn-danger text-white"> <i class="fas fa-trash-alt"></i> Delete</button></td>
        </tr>
    `;
  }

  bodyContent.innerHTML = bodyHtmlContainer;
}

function clearData() {
  siteName.value = null;
  siteUrl.value = null;
}

function deleteURL(index) {
  allWebsites.splice(index, 1);
  displayWebsites(allWebsites);
  localStorage.setItem("allwebsitesLinks", JSON.stringify(allWebsites));
}

function validateBookmarkLink(regex, inputValue, input) {
  if (regex.test(inputValue)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}

function isValid() {
  if (
    validateBookmarkLink(/^[\w\s]{5,25}$/, siteName.value, siteName) &&
    validateBookmarkLink(
      /^(https?:\/\/)?(([a-z\d]([a-z\d-]*[a-z\d])*)\.)+([a-z]{2,})(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i,
      siteUrl.value,
      siteUrl
    )
  ) {
    return true;
  } else {
    return false;
  }
}
