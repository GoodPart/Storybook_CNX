import a11yReport from './a11y/report.mdx?raw';

export default {
  title: 'Atom/Accordion/Accessibility Report',
  parameters: {
    viewMode: 'docs',
    previewTabs: {
      canvas: { hidden: true }
    },
    options: {
      showPanel: false
    }
  }
};

export const Report = {
  name: 'Accessibility Report',
  render: () => {
    const container = document.createElement('div');
    container.className = 'a11y-report';
    container.innerHTML = `
      <div style="padding: 20px; font-family: 'Arial', sans-serif;">
        <h1 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">접근성 보고서</h1>
        <div style="line-height: 1.6;">
          <pre style="white-space: pre-wrap; word-break: break-word;">${a11yReport}</pre>
        </div>
      </div>
    `;
    return container;
  }
};
