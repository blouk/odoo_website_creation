{
    'name': 'Odoo website Tutorials',
    'description': 'Odoo website Tutorials',
    'category': 'Theme',
    'version': '1.0',
    'author': 'nwi@odoo.com',
    'depends': ['website_sale'],
    'data': [

        # data
        'data/action_server.xml',
        # views
        'views/layout.xml',
        'views/theme.xml',
        'views/homepage.xml',
        'views/snippet.xml',
        # backend

    ],

    'application': True,
    'installable': True,
}
