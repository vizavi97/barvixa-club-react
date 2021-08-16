<?php

namespace App\Admin\Controllers;

use App\Classes\AdminHelper;
use App\Models\FAQ;
use App\Http\Controllers\Controller;
use Encore\Admin\Controllers\HasResourceActions;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Layout\Content;
use Encore\Admin\Show;

class FAQController extends Controller
{
    use HasResourceActions;

    /**
     * Index interface.
     *
     * @param Content $content
     * @return Content
     */
    public function index(Content $content)
    {
        return $content
            ->header(trans('admin.index'))
            ->description(trans('admin.description'))
            ->body($this->grid());
    }

    /**
     * Show interface.
     *
     * @param mixed $id
     * @param Content $content
     * @return Content
     */
    public function show($id, Content $content)
    {
        return $content
            ->header(trans('admin.detail'))
            ->description(trans('admin.description'))
            ->body($this->detail($id));
    }

    /**
     * Edit interface.
     *
     * @param mixed $id
     * @param Content $content
     * @return Content
     */
    public function edit($id, Content $content)
    {
        return $content
            ->header(trans('admin.edit'))
            ->description(trans('admin.description'))
            ->body($this->form()->edit($id));
    }

    /**
     * Create interface.
     *
     * @param Content $content
     * @return Content
     */
    public function create(Content $content)
    {
        return $content
            ->header(trans('admin.create'))
            ->description(trans('admin.description'))
            ->body($this->form());
    }

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new FAQ);

        $grid->id('ID');
        $grid->column('active','Активность')->switch(AdminHelper::switcherData());
        $grid->column('sort','Сортировка')->editable();
        $grid->column('headline_ru','Заголовок');
        $grid->column('text_ru','Текст');

        return $grid;
    }

    /**
     * Make a show builder.
     *
     * @param mixed $id
     * @return Show
     */
    protected function detail($id)
    {
        $show = new Show(FAQ::findOrFail($id));

        $show->id('ID');
        $show->active('active');
        $show->sort('sort');
        $show->headline_ru('headline_ru');
        $show->headline_en('headline_en');
        $show->text_ru('text_ru');
        $show->text_en('text_en');
        $show->created_at(trans('admin.created_at'));
        $show->updated_at(trans('admin.updated_at'));

        return $show;
    }

    /**
     * Make a form builder.
     *
     * @return Form
     */
    protected function form()
    {
        $form = new Form(new FAQ);

        $form->tab('Основное', function (Form $form) {
            $form->display('ID');
            $form->switch('active', 'Активность')->options(AdminHelper::switcherData());
            $form->number('sort', 'Сортировка');
        });
        $form->tab('RU', function (Form $form) {
            $form->text('headline_ru', 'Заголовок RU');
            $form->textarea('text_ru', 'Текст RU');
        });
        $form->tab('EN', function (Form $form) {
            $form->text('headline_en', 'Заголовок EN');
            $form->textarea('text_en', 'Текст EN');
        });

        return $form;
    }
}
