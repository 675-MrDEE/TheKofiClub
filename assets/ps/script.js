const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

// Accessibility: Keyboard navigation and ARIA updates for tabs
const tabList = document.querySelector('.tabs');

if (tabList) {
  tabList.addEventListener('keydown', (e) => {
    const tabsArr = Array.from(tabs);
    const currentIndex = tabsArr.indexOf(document.activeElement);
    let newIndex = -1;
    if (e.key === 'ArrowRight') {
      newIndex = (currentIndex + 1) % tabsArr.length;
    } else if (e.key === 'ArrowLeft') {
      newIndex = (currentIndex - 1 + tabsArr.length) % tabsArr.length;
    } else if (e.key === 'Home') {
      newIndex = 0;
    } else if (e.key === 'End') {
      newIndex = tabsArr.length - 1;
    }
    if (newIndex > -1) {
      tabsArr[newIndex].focus();
      e.preventDefault();
    }
  });
}

// Update ARIA attributes on tab switch
function updateAriaSelected(selectedTab) {
  tabs.forEach(tab => {
    tab.setAttribute('aria-selected', tab === selectedTab ? 'true' : 'false');
    tab.setAttribute('tabindex', tab === selectedTab ? '0' : '-1');
  });
}

// Close navbar when a nav link is clicked (for mobile)
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabTarget)
    tabContents.forEach(tabContent => {
      tabContent.classList.remove('active')
    });
    tabs.forEach(tab => {
      tab.classList.remove('active')
    });
    tab.classList.add('active')
    target.classList.add('active')
    updateAriaSelected(tab);
    tab.focus();
    
    // Close navbar on mobile when a link is clicked
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: false
      });
      bsCollapse.hide();
      // Update aria-expanded on toggler
      if (navbarToggler) {
        navbarToggler.setAttribute('aria-expanded', 'false');
      }
    }
  });
  // Set initial ARIA state
  if (tab.classList.contains('active')) {
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');
  } else {
    tab.setAttribute('aria-selected', 'false');
    tab.setAttribute('tabindex', '-1');
  }
});