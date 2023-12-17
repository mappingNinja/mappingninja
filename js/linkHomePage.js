const isLocalhost = window.location.protocol === "http:"
if (isLocalhost) {
    const homePageLinks = document.querySelectorAll('.homePage');
    (homePageLinks || []).forEach((homePageLink) => {
        homePageLink.href = "/mappingninja";
    })
}
