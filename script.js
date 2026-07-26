/* =========================================================
   DOWNLOAD RESUME
========================================================= */

const resumeBtn = document.getElementById("resumeDownload");
const popup = document.getElementById("downloadPopup");
const fill = document.getElementById("loadingFill");
const statusText = document.getElementById("loadingText");

if (resumeBtn) {

    resumeBtn.addEventListener("click", function (e) {

        e.preventDefault();

        if (!popup || !fill || !statusText) {

            console.error("Download popup elements not found.");

            const link = document.createElement("a");
            link.href = "./resume.pdf";
            link.download = "Vijay_Ghatage_Resume.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            return;
        }

        resumeBtn.style.pointerEvents = "none";

        popup.classList.add("active");

        fill.style.transition = "none";
        fill.style.width = "0%";

        setTimeout(() => {
            fill.style.transition = "width 0.8s ease";
        }, 50);

        statusText.innerHTML = "ACCESSING SECURE FILES...";

        setTimeout(() => {

            fill.style.width = "25%";
            statusText.innerHTML = "INITIALIZING DOWNLOAD SYSTEM...";

        }, 700);

        setTimeout(() => {

            fill.style.width = "55%";
            statusText.innerHTML = "LOADING RESUME ASSETS...";

        }, 1700);

        setTimeout(() => {

            fill.style.width = "85%";
            statusText.innerHTML = "VERIFYING FILE INTEGRITY...";

        }, 2700);

        setTimeout(() => {

            fill.style.width = "100%";
            statusText.innerHTML = "DOWNLOAD READY";

        }, 3700);

        /* DOWNLOAD */

        setTimeout(() => {

            const link = document.createElement("a");

            link.href = "./resume.pdf";
            link.download = "Vijay_Ghatage_Resume.pdf";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        }, 4300);

        /* CLOSE POPUP */

        setTimeout(() => {

            popup.classList.remove("active");
            resumeBtn.style.pointerEvents = "auto";

        }, 5200);

    });

}


/* =========================================================
   GENERIC POPUP HELPER
   (used for About / Skills / Contact popups)
========================================================= */

function setupPopup(btnId, popupId, closeBtnId) {

    const btn = document.getElementById(btnId);
    const pop = document.getElementById(popupId);
    const closeBtn = document.getElementById(closeBtnId);

    if (!btn || !pop) return;

    btn.addEventListener("click", function (e) {

        e.preventDefault();
        pop.classList.add("active");
        document.body.style.overflow = "hidden";

    });

    function closePopup() {

        pop.classList.remove("active");
        document.body.style.overflow = "auto";

    }

    if (closeBtn) {
        closeBtn.addEventListener("click", closePopup);
    }

    pop.addEventListener("click", function (e) {

        if (e.target === pop) {
            closePopup();
        }

    });

    document.addEventListener("keydown", function (e) {

        if (e.key === "Escape" && pop.classList.contains("active")) {
            closePopup();
        }

    });

}


/* ABOUT POPUP */
setupPopup("aboutBtn", "aboutPopup", "aboutCloseBtn");

/* SKILLS POPUP */
setupPopup("skillsBtn", "skillsPopup", "skillsCloseBtn");

/* CONTACT POPUP */
setupPopup("contactBtn", "contactPopup", "contactCloseBtn");