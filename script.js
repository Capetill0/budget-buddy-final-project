function showSection(sectionId) {
  document.querySelectorAll(".view").forEach(section => {
    section.classList.add("hidden");
  });

  document.getElementById(sectionId).classList.remove("hidden");
}