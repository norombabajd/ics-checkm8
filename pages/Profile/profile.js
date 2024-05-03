// import { supabase } from '../../index.js';

// const { data: { user } } = await supabase.auth.getUser()
// console.log(data);




// Kevin  commented out the above because it prevented the functions to run
window.addEventListener('DOMContentLoaded', () => {
    showSubMenu('general');
  });
function showSubMenu(submenuId) {
        // Hide all submenus
        const submenus = document.querySelectorAll('.submenu');
        submenus.forEach(submenu => {
            submenu.classList.remove('active');
        });

        // Show the selected submenu
        const selectedSubmenu = document.getElementById(`submenu-${submenuId}`);
        selectedSubmenu.classList.add('active');
    }