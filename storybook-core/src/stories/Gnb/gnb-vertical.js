document.addEventListener('DOMContentLoaded', function() {
    const gnbVerticalItems = document.querySelectorAll('.gnb-vertical-item');
    const gnbVerticalDropdowns = document.querySelectorAll('.gnb-vertical-dropdown-content');
    const isMobile = window.innerWidth <= 768;
    
    console.log('GNB 초기화:', {
        '메뉴 아이템 수': gnbVerticalItems.length,
        '드롭다운 수': gnbVerticalDropdowns.length,
        '모바일 모드': isMobile
    });
    
    // 모든 드롭다운을 숨기는 함수
    function hideAllDropdowns() {
        gnbVerticalDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
    
    // 모바일 환경에서 클릭 이벤트 처리
    if (isMobile) {
        gnbVerticalItems.forEach((item, index) => {
            const link = item.querySelector('.gnb-vertical-link');
            const dataMenu = item.getAttribute('data-menu');
            const dropdown = document.querySelector(`.gnb-vertical-dropdown-content[data-menu="${dataMenu}"]`);
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // 클릭한 메뉴의 드롭다운 토글
                hideAllDropdowns();
                
                if (dropdown) {
                    dropdown.classList.toggle('active');
                    // 메뉴 활성화 상태 토글
                    gnbVerticalItems.forEach(otherItem => {
                        otherItem.classList.remove('active');
                    });
                    item.classList.toggle('active');
                }
            });
        });
    } else {
        // 데스크톱 환경에서는 CSS hover로 처리되도록 JS 제거
        console.log('데스크톱 환경: CSS hover 사용');
    }
    
    // 테스트 모드 확인
    if (document.querySelector('.gnb-vertical.test-show-dropdown')) {
        console.log('테스트 모드 활성화: 첫 번째 드롭다운 표시됨');
    }
    
    // 모든 드롭다운을 보이게 하는 디버깅 기능
    window.showAllDropdowns = function() {
        gnbVerticalDropdowns.forEach(dropdown => {
            dropdown.classList.add('active');
        });
        console.log('모든 드롭다운 표시됨');
    };
    
    // 특정 드롭다운만 보이게 하는 디버깅 기능
    window.showDropdown = function(index) {
        hideAllDropdowns();
        const dropdown = document.querySelector(`.gnb-vertical-dropdown-content[data-menu="${index}"]`);
        if (dropdown) {
            dropdown.classList.add('active');
            console.log(`드롭다운 #${index} 표시됨`);
        }
    };
    
    // 테스트용 - 개발 완료 후 제거
    if (!isMobile) {
        setTimeout(function() {
            console.log('테스트: 첫 번째 드롭다운 자동 표시');
            window.showDropdown(0);
        }, 500);
    }
}); 