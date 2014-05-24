from setuptools import setup, find_packages

setup(
    name="django-bootstrap-typeahead",
    version="1.1.5",
    packages=find_packages(),
    author="A.J. May",
    author_email="aj7may@gmail.com",
    description="Convert django model choice fields into typeahead fields.",
    license="MIT License",
    keywords="django bootstrap typeahead form widget input",
    url="http://thegoods.aj7may.com/django-bootstrap-typeahead",
    zip_safe=False,
    include_package_data=True
)
