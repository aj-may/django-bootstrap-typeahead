from setuptools import setup, find_packages

setup(
    name="django-bootstrap-typeahead",
    version="1.1.3",
    packages=find_packages(),
    author="A.J. May",
    author_email="aj7may@gmail.com",
    description="""A typeahead django form input which
        accepts a queryset to populate the typeahead options.""",
    license="MIT License",
    keywords="django bootstrap typeahead form widget input",
    url="http://thegoods.aj7may.com/django-bootstrap-typeahead",
    zip_safe=False,
    package_data={
        'django_bootstrap_typeahead': [
            'static/js/*',
            'static/css/*',
        ],
    },
)
