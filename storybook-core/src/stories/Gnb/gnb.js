export class Gnb {
	constructor(element, options = {}) {
		this.gnb = element;
		this.menuItems = Array.from(element.querySelectorAll('.gnb-menu-item') || []);
		this.mobileToggle = element.querySelector('.gnb-mobile-toggle');
		this.init();
	}

	init() {
		if (this.type === 'vertical') {
			this.initVertical();
		} else {
			this.initDefault();
		}

		document.addEventListener('click', (e) => {
			if (!this.gnb.contains(e.target)) {
				this.closeAllSubmenus();
			}
		});

		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && this.gnb.classList.contains('mobile-open')) {
				this.toggleMobileMenu();
			}
		});
	}

	initDefault() {
		// MO
		if (this.mobileToggle) {
			this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
		}

		this.menuItems.forEach((item, itemIndex) => {
			const menuButton = item.querySelector('.gnb-menu-button');
			const menuLink = item.querySelector('.gnb-menu-link');
			
			if (menuButton) {
				const submenuId = menuButton.getAttribute('aria-controls');
				const submenu = document.getElementById(submenuId);
				
				// submenu가 null인 경우 처리
				if (!submenu) {
					console.warn(`Submenu with id ${submenuId} not found`);
					return;
				}
				
				menuButton.addEventListener('click', () => this.toggleSubmenu(menuButton, submenu));
				
				// 키보드 접근성
				menuButton.addEventListener('keydown', (e) => {
					switch (e.key) {
						case 'Enter':
						case ' ':
							e.preventDefault();
							this.toggleSubmenu(menuButton, submenu);
						break;
						case 'ArrowDown':
							e.preventDefault();
							if (menuButton.getAttribute('aria-expanded') === 'true') {
								// 서브메뉴가 열려있으면 첫 번째 항목으로 포커스 이동
								const firstSubmenuItem = submenu.querySelector('a');
								if (firstSubmenuItem) firstSubmenuItem.focus();
							} else {
								// 다음 메뉴 항목으로 포커스 이동
								this.focusNextMenuItem(item);
							}
						break;
						case 'ArrowUp':
							e.preventDefault();
							this.focusPrevMenuItem(item);
						break;
						case 'Escape':
							e.preventDefault();
							if (menuButton.getAttribute('aria-expanded') === 'true') {
								this.closeSubmenu(menuButton, submenu);
								menuButton.focus();
							}
						break;
						case 'Tab':
							// 탭 키를 누르면 서브메뉴가 열려있지 않은 경우 열고 첫 번째 항목으로 포커스 이동
							if (menuButton.getAttribute('aria-expanded') !== 'true' && !e.shiftKey) {
								e.preventDefault();
								this.openSubmenu(menuButton, submenu);
								const firstSubmenuItem = submenu.querySelector('a');
								if (firstSubmenuItem) {
									setTimeout(() => {
										firstSubmenuItem.focus();
									}, 10);
								}
							} else if (e.shiftKey && itemIndex > 0) {
								// Shift+Tab을 누르면 이전 메뉴 항목으로 이동
								const prevItem = this.menuItems[itemIndex - 1];
								const prevButton = prevItem.querySelector('.gnb-menu-button');
								
								if (prevButton) {
									const prevSubmenuId = prevButton.getAttribute('aria-controls');
									if (prevSubmenuId) {
										const prevSubmenu = document.getElementById(prevSubmenuId);
										if (prevSubmenu) {
											const prevSubmenuItems = prevSubmenu.querySelectorAll('a');
											if (prevSubmenuItems.length > 0) {
												e.preventDefault();
												this.openSubmenu(prevButton, prevSubmenu);
												prevSubmenuItems[prevSubmenuItems.length - 1].focus();
											}
										}
									}
								}
							}
						break;
					}
				});

				// 서브메뉴 항목 키보드 접근성
				const submenuItems = submenu.querySelectorAll('a');
				if (submenuItems && submenuItems.length > 0) {
					submenuItems.forEach((submenuItem, index) => {
						submenuItem.addEventListener('keydown', (e) => {
							switch (e.key) {
								case 'ArrowDown':
								e.preventDefault();
								if (index < submenuItems.length - 1) {
									submenuItems[index + 1].focus();
								} else {
									// 마지막 항목에서는 다음 메뉴로 이동
									this.focusNextMenuItem(item);
								}
								break;
								case 'ArrowUp':
								e.preventDefault();
								if (index > 0) {
									submenuItems[index - 1].focus();
								} else {
									// 첫 번째 항목에서는 메뉴 버튼으로 이동
									menuButton.focus();
								}
								break;
								case 'Escape':
								e.preventDefault();
								this.closeSubmenu(menuButton, submenu);
								menuButton.focus();
								break;
								case 'Tab':
								if (e.shiftKey) {
									// Shift+Tab을 누르면 이전 항목으로 이동
									e.preventDefault();
									if (index > 0) {
									// 서브메뉴 내에서 이전 항목으로 이동
									submenuItems[index - 1].focus();
									} else {
									// 첫 번째 서브메뉴 항목에서는 메뉴 버튼으로 이동
									this.closeSubmenu(menuButton, submenu);
									menuButton.focus();
									}
								} else if (index === submenuItems.length - 1) {
									// 마지막 서브메뉴 항목에서 탭 키를 누르면 서브메뉴를 닫고 다음 메뉴로 이동
									this.closeSubmenu(menuButton, submenu);
								}
								break;
							}
						});
					});
				}
			}

			// 메뉴 링크에 Shift+Tab 이벤트 추가 (서브메뉴가 없는 항목)
			if (menuLink && !menuButton && itemIndex > 0) {
				menuLink.addEventListener('keydown', (e) => {
				if (e.key === 'Tab' && e.shiftKey) {
					// 이전 메뉴 항목이 서브메뉴를 가지고 있는지 확인
					const prevItem = this.menuItems[itemIndex - 1];
					const prevButton = prevItem.querySelector('.gnb-menu-button');
					
					if (prevButton) {
					const prevSubmenuId = prevButton.getAttribute('aria-controls');
					if (prevSubmenuId) {
						const prevSubmenu = document.getElementById(prevSubmenuId);
						if (prevSubmenu) {
						const prevSubmenuItems = prevSubmenu.querySelectorAll('a');
						if (prevSubmenuItems.length > 0) {
							e.preventDefault();
							this.openSubmenu(prevButton, prevSubmenu);
							prevSubmenuItems[prevSubmenuItems.length - 1].focus();
						}
						}
					}
					}
				}
				});
			}
		});
	}

	// MO
	toggleMobileMenu() {
		const isOpen = this.gnb.classList.contains('mobile-open');
		this.gnb.classList.toggle('mobile-open');
		
		if (this.mobileToggle) {
			this.mobileToggle.setAttribute('aria-expanded', !isOpen);
			this.mobileToggle.setAttribute('aria-label', isOpen ? '메뉴 열기' : '메뉴 닫기');
		}
		
		if (isOpen) {
			this.closeAllSubmenus();
		}
	}

	toggleSubmenu(menuButton, submenu) {
		if (!menuButton || !submenu) return;
		
		const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
		
		if (!isExpanded) {
			this.openSubmenu(menuButton, submenu);
		} else {
			this.closeSubmenu(menuButton, submenu);
		}
	}

	openSubmenu(menuButton, submenu) {
		if (!menuButton || !submenu) return;

		// 다른 열린 서브메뉴 닫기
		this.closeAllSubmenus();

		menuButton.setAttribute('aria-expanded', 'true');
		submenu.hidden = false;

		// 애니메이션을 위한 높이 계산
		submenu.style.height = '0';
		const height = submenu.scrollHeight;
		submenu.style.height = height + 'px';

		setTimeout(() => {
			submenu.style.height = '';
			console.log(submenu.scrollHeight);
		}, 300);
	}

	closeSubmenu(menuButton, submenu) {
		if (!menuButton || !submenu) return;

		menuButton.setAttribute('aria-expanded', 'false');

		submenu.style.height = submenu.scrollHeight + 'px';
		setTimeout(() => {
			submenu.style.height = '0';
		}, 0);
		
		setTimeout(() => {
			submenu.hidden = true;
			submenu.style.height = '';
		}, 300);
	}

	closeAllSubmenus() {
		this.menuItems.forEach(item => {
			const menuButton = item.querySelector('.gnb-menu-button');
			if (menuButton) {
				const submenuId = menuButton.getAttribute('aria-controls');
				const submenu = document.getElementById(submenuId);
				if (submenu && menuButton.getAttribute('aria-expanded') === 'true') {
					this.closeSubmenu(menuButton, submenu);
				}
			}
		});
	}

	focusNextMenuItem(currentItem) {
		const index = this.menuItems.indexOf(currentItem);
		if (index < this.menuItems.length - 1) {
			const nextItem = this.menuItems[index + 1];
			const nextFocusable = nextItem.querySelector('.gnb-menu-button, .gnb-menu-link');

			if (nextFocusable) nextFocusable.focus();
		}
	}

	focusPrevMenuItem(currentItem) {
		const index = this.menuItems.indexOf(currentItem);
		if (index > 0) {
			const prevItem = this.menuItems[index - 1];
			const prevFocusable = prevItem.querySelector('.gnb-menu-button, .gnb-menu-link');

			if (prevFocusable) prevFocusable.focus();
		}
	}
	
	// type2 : PENDING
	// ...
}