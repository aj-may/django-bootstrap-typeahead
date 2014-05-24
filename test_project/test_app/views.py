from django.shortcuts import render
from django.contrib import messages
from .forms import TestForm


def test_view(request):
    if request.method == 'POST':
        form = TestForm(request.POST)
        if form.is_valid():
            if form.cleaned_data['typeahead']:
                messages.success(
                    request,
                    'Typeahead: %s' % form.cleaned_data['typeahead']
                )
            if form.cleaned_data['multi_typeahead']:
                messages.success(
                    request,
                    'MultipleTypeahead: %s' % form.cleaned_data['multi_typeahead']
                )
    else:
        form = TestForm()

    return render(request, 'test.html', {
        'form': form,
    })
