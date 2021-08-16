<?php

namespace App\Admin\Controllers;

use App\Classes\AdminHelper;
use App\Models\InfoToBy;
use App\Http\Controllers\Controller;
use Encore\Admin\Controllers\HasResourceActions;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Layout\Content;
use Encore\Admin\Show;

class InfoToByController extends Controller
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
        $grid = new Grid(new InfoToBy);

        $grid->id('ID');
        $grid->column('active', 'Активность')->switch(AdminHelper::switcherData());
        $grid->column('sort', 'Сортировка')->editable();
        $grid->column('text_ru', 'Текст RU');
        $grid->column('text_en', 'Текст EN');

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
        $show = new Show(InfoToBy::findOrFail($id));

        $show->id('ID');
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
        $form = new Form(new InfoToBy);

        $form->display('ID');
        $form->switch('active', 'Активность')->options(AdminHelper::switcherData());
        $form->number('sort', 'Сортировка');
        $form->textarea('text_ru', 'Текст ru');
        $form->textarea('text_en', 'Текст en');

        return $form;
    }
}
