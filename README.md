# Portfolio Website

A modern, responsive portfolio website with an admin panel for easy content management.

## Features

- **Modern Design**: Clean, professional design with smooth animations and gradients
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Admin Panel**: Easy-to-use admin interface for editing all content
- **Data Persistence**: Uses localStorage to save your changes
- **No Backend Required**: Pure HTML, CSS, and JavaScript - ready to deploy anywhere

## Files Structure

- `index.html` - Main portfolio page
- `admin.html` - Admin panel for editing content
- `styles.css` - Main stylesheet for the portfolio
- `admin.css` - Stylesheet for the admin panel
- `script.js` - JavaScript for portfolio functionality
- `admin.js` - JavaScript for admin panel functionality

## How to Use

### Viewing the Portfolio

1. Open `index.html` in your web browser
2. Navigate through the sections using the navigation menu

### Editing Content

1. Click on "Admin" in the navigation menu or open `admin.html` directly
2. Edit any section:
   - Personal Information (name, contact details, description)
   - Experience (add, edit, or remove work experiences)
   - Education (add, edit, or remove educational qualifications)
   - Projects (add, edit, or remove projects)
   - Skills & Languages
3. Click "Save Changes" to persist your edits
4. Your changes will be saved in the browser's localStorage
5. Return to the main portfolio to see your updates

### Adding Experience Points

- For each experience entry, you can add multiple description points
- Click "Add Point" to add a new bullet point
- Click the "X" button to remove a bullet point

### Resetting to Default

- Click "Reset to Default" in the admin panel to restore original content
- This will remove all your customizations

## Customization

The design uses CSS custom properties (variables) in `styles.css` for easy theming:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    /* ... more variables */
}
```

Modify these variables to change the color scheme of your portfolio.

## Deployment

You can deploy this portfolio to any static hosting service:

- **GitHub Pages**: Push to a repository and enable GitHub Pages
- **Netlify**: Drag and drop the folder or connect via Git
- **Vercel**: Connect your repository or deploy via CLI
- **Any Web Server**: Upload all files to your web hosting service

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- Data is stored in localStorage, so changes are specific to each browser
- For production use with multiple users, consider migrating to a backend database
- The admin panel is not password-protected - add authentication if needed for public deployment

## License

This portfolio template is free to use and modify for personal or commercial projects.
