from django.forms import ModelChoiceField
from .widgets import TypeaheadInput


class TypeaheadField(ModelChoiceField):
    """A Typeahead Text field"""

    def __init__(self, queryset, builder=False, required=True, label=None,
                 initial=None, help_text='', limit_choices_to=None,
                 *args, **kwargs):

        super(TypeaheadField, self).__init__(
            queryset, required=required,
            widget=TypeaheadInput(queryset=queryset, builder=builder),
            label=label, initial=initial, help_text=help_text,
            limit_choices_to=limit_choices_to, *args, **kwargs
        )
