from django.forms import Select, SelectMultiple


class TypeaheadInput(Select):
    def __init__(self, queryset, builder=False, attrs=None, choices=()):
        super(TypeaheadInput, self).__init__(attrs=attrs, choices=choices)
        self.queryset = queryset
        self.builder = builder

    def render(self, name, value, attrs=None, choices=()):
        new_attrs = {
            'class': 'typeahead-select'
        }
        if attrs:
            new_attrs.update(attrs)

        return super(TypeaheadInput, self).render(
            name=name,
            value=value,
            attrs=new_attrs,
            choices=choices
        )

    def value_from_datadict(self, data, files, name):
        value = data.get(name, None)
        if self.queryset and self.builder:
            try:
                self.queryset.get(pk=value)
                return value
            except (ValueError, self.queryset.model.DoesNotExist):
                new_object = self.builder(value)
                return new_object.pk
        return value

    class Media:
        js = (
            'js/bootstrap3-typeahead.min.js',
            'js/bootstrap-typeahead.js',
        )


class MultipleTypeaheadInput(SelectMultiple):
    def __init__(self, queryset, builder, attrs=None, choices=()):
        super(MultipleTypeaheadInput, self).__init__(
            attrs=attrs,
            choices=choices
        )
        self.queryset = queryset
        self.builder = builder

    def render(self, name, value, attrs=None, choices=()):
        new_attrs = {
            'class': 'typeahead-select'
        }
        if attrs:
            new_attrs.update(attrs)

        return super(MultipleTypeaheadInput, self).render(
            name=name,
            value=value,
            attrs=new_attrs,
            choices=choices
        )

    def value_from_datadict(self, data, files, name):
        value = []
        for tag in data.getlist(name):
            try:
                self.queryset.get(pk=tag)
                value.append(tag)
            except (ValueError, self.queryset.model.DoesNotExist):
                new_object = self.builder(tag)
                value.append(new_object.pk)
        return value

    class Media:
        css = {
            'all': (
                'css/bootstrap-typeahead.css',
            )
        }
        js = (
            'js/bootstrap3-typeahead.min.js',
            'js/bootstrap-typeahead.js',
        )
